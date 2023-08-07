import { Button, Modal } from "antd";
import { useState } from "react";
import ModificationForm from "./ModificationForm";

const ModifyButton = ({ item, handleModifySuccess }) => {
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
          open={modalVisible}
          closable={true}
          footer={null}
          onCancel={() => {
            setModalVisible(false);
          }}
          destroyOnClose={true}
        >
          <ModificationForm
            item={item}
            handleModifySuccess={handleModifySuccess}
          />
        </Modal>
      )}
    </>
  );
};

export default ModifyButton;
