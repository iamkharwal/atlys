
import { Modal } from "../../common/Modal";
import { AuthCard } from "../../common/AuthCard";

type AuthPopupProps = {
  show: boolean;
  onClose(): void;
};

export function AuthPopup({ show, onClose }: AuthPopupProps) {
  return (
    <Modal show={show} onClose={onClose}>
      <AuthCard />
    </Modal>
  );
}
