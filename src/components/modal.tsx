import { ReactNode, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    ref={overlayRef}
                    onClick={handleOverlayClick}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        role="dialog"
                        aria-modal="true"
                        className="relative bg-white dark:bg-zinc-800 rounded shadow-xl p-6 max-w-md w-full"
                    >
                        <button
                            onClick={onClose}
                            aria-label="Close modal"
                            className="absolute top-2 right-2 z-50 flex items-center justify-center w-8 h-8 rounded hover:bg-black/30"
                        >
                            <span className="relative text-xl leading-none -translate-y-px">&times;</span>
                        </button>
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default Modal;