import aiImage from '../assets/ai.png'
import userImage from '../assets/user.png'

export default function ChatBox({ type, text }) {
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
				{text || (type === 'ai' && <span className="loader"></span>)}
			</div>
		</div>
	)
}
