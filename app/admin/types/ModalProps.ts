export type ModalProps = {
  isOpen: boolean;
  onCloseChange: () => void;
  title: string;
  handleSubmit?: (data: any, _?: any, event?: any) => void;
  stopEventPropagation?: boolean;
};
