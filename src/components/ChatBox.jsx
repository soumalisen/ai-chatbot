import aiImage from '../assets/ai.png'
import userImage from '../assets/user.png'
import '../style.css'

export default function ChatBox({ loading, type, text }) {
	const renderImage = (src, alt, width) => {
		return (
			<img
				src={src}
				alt={alt}
				style={{
					width,
					height: 'min-content',
				}}
			/>
		)
	}

	const renderAiImage = () => {
		if (type === 'user') return null
		return renderImage(aiImage, 'ai-image', '10%')
	}

	const renderUserImage = () => {
		if (type === 'ai') return null
		return renderImage(userImage, 'user-image', '10%')
	}

	return (
		<div className={type === 'user' ? 'user-chat-box' : 'ai-chat-box'}>
			{renderAiImage()}
			<div
				className={type === 'user' ? 'user-chat-area' : 'ai-chat-area'}
			>
				{type === 'ai' && loading ? (
					<div className="loader">
						<div />
						<div />
						<div />
					</div>
				) : (
					text
				)}
			</div>
			{renderUserImage()}
		</div>
	)
}
