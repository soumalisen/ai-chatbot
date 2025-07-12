import './style.css'
import { useState } from 'react'
import ChatBox from './components/ChatBox'
// import { API_KEY } from './config'
import aiImage from './assets/ai.png'
import sendbtn from './assets/arr.png'

const Api_Url =
	'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

const systemContext = `
You are an AI chatbot designed only to answer questions about Siliguri Institute of Technology (SIT).

Your job is to assist users with queries related to SIT, including:
•⁠  ⁠Admission procedures
•⁠  ⁠Departments and courses
•⁠  ⁠Faculty members
•⁠  ⁠Campus and hostel life
•⁠  ⁠Fees, placements, scholarships
•⁠  ⁠Events, infrastructure, contact info

If a user asks something unrelated (like current affairs, jokes, or general knowledge), politely respond:
"I can only assist with queries related to Siliguri Institute of Technology (SIT). Please ask something specific to SIT."
`

function App() {
	const [prompt, setPrompt] = useState('')
	const [messages, setMessages] = useState([
		{ type: 'ai', text: 'Hello! How can I help you?' },
	])

	const handleSend = async () => {
		if (!prompt.trim()) return

		const userMessage = { type: 'user', text: prompt }
		setMessages((prev) => [...prev, userMessage, { type: 'ai', text: '' }])
		setPrompt('')

		const requestBody = {
			contents: [
				{
					role: 'model',
					parts: [{ text: systemContext }],
				},
				{
					role: 'user',
					parts: [{ text: prompt }],
				},
			],
		}
		console.log(import.meta.env.GEMINI_API_KEY)
		try {
			const res = await fetch(Api_Url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-goog-api-key': import.meta.env.GEMINI_API_KEY,
				},
				body: JSON.stringify(requestBody),
			})

			const data = await res.json()
			const reply =
				data?.candidates?.[0]?.content?.parts?.[0]?.text ||
				'No response.'
			setMessages((prev) => {
				const updated = [...prev]
				updated[updated.length - 1] = { type: 'ai', text: reply }
				return updated
			})
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className="app">
			<div className="chat-container">
				{messages.map((msg, idx) => (
					<ChatBox key={idx} type={msg.type} text={msg.text} />
				))}
			</div>
			<div className="prompt-area">
				<input
					type="text"
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					placeholder="Message..."
					onKeyDown={(e) => e.key === 'Enter' && handleSend()}
				/>
				<button onClick={handleSend}>
					<img src={sendbtn} alt="Send" />
				</button>
			</div>
		</div>
	)
}

export default App
