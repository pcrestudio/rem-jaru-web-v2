export type ModalProps = {
  isOpen: boolean;
  onCloseChange: () => void;
  title: string;
  handleSubmit?: (data: any) => void;
  stopEventPropagation?: boolean;
};
