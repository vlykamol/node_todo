import ReactDOM from 'react-dom';

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center">
      <div className="bg-slate-200 p-8 border-8 relative min-w-96">
        <button onClick={onClose} className="absolute top-2 right-3 border-none bg-transparent text-xl cursor-pointer">X</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
