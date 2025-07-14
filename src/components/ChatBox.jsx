import aiImage from '../assets/ai.png'
import userImage from '../assets/user.png'
import '../style.css'

export default function ChatBox({ loading, type, text }) {
	return (
		<div className={type === 'user' ? 'user-chat-box' : 'ai-chat-box'}>
			<img
				src={type === 'user' ? userImage : aiImage}
				alt={`${type}-image`}
				width={type === 'user' ? '8%' : '10%'}
			/>
			<div
				className={type === 'user' ? 'user-chat-area' : 'ai-chat-area'}
			>
				{type === 'ai' && loading ? (
					<span className="loader"></span>
				) : (
					text
				)}
			</div>
		</div>
	)
}
