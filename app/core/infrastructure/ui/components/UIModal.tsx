
import { Modal } from 'react-bootstrap';

export type UIModalProps  = {
    id?: string;
    title: string;
    size?: "sm" | "lg" | "xl" | undefined;
    show: boolean;
    closeButton: boolean;
    children: React.ReactNode;
    onHide?: () => void;
}

export const UIModal: React.FC<UIModalProps> = ({ id, title, size, show, closeButton, onHide, children }) => {

        const _size = size ? size : 'sm';

        return (
          <Modal key={id?id:'modal'} show={show} onHide={onHide} size={size} enforceFocus={true} >
            <Modal.Header closeButton={closeButton}>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {children}
            </Modal.Body>
          </Modal>
        );
      }