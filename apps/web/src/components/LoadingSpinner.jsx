export default function LoadingSpinner({ text = 'กำลังโหลด...' }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
}
