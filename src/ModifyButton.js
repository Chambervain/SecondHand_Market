import { Button } from "antd";
import ModificationForm from "./ModificationForm";

const ModifyButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  return (
    <>
      <Button onClick={openModal} shape="round">
        Modify
      </Button>
      {modalVisible && (
        <Modal
          title={modalTitle}
          centered={true}
          visible={modalVisible}
          closable={false}
          footer={null}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <ModificationForm />
        </Modal>
      )}
    </>
  );
};

export default ModifyButton;
