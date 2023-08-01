import { Button, Modal } from "antd";
import { useState } from "react";
import ModificationForm from "./ModificationForm";

const ModifyButton = ({ itemId }) => {
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
          title="Modify"
          centered={true}
          visible={modalVisible}
          closable={true}
          footer={null}
          onCancel={() => {
            setModalVisible(false);
          }}
          destroyOnClose={true}
        >
          <ModificationForm itemId={itemId} />
        </Modal>
      )}
    </>
  );
};

export default ModifyButton;
