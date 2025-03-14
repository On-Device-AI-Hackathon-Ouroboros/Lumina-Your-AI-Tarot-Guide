export default function Welcome({ onNext }) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50 p-6">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">👋 欢迎来到Nova的世界！</h1>
        <img src="/nova.png" alt="Nova" className="w-48 h-48 mb-6"/>
        <p className="text-xl text-purple-600 mb-6">
          你好呀！我是你的小精灵Nova，我会陪伴你完成神奇的预测之旅～
        </p>
        <button
          className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition"
          onClick={() => {
            // 跳转到用户输入页面，可以用react-router-dom实现
          }}
        >
          现在开始吧！
        </button>
      </div>
    );
  }