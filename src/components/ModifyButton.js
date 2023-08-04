import { Button, Modal, Tooltip } from "antd";
import { useState } from "react";
import ModificationForm from "./ModificationForm";
import { EditOutlined } from "@ant-design/icons";

const ModifyButton = ({ itemId }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  return (
    <>
      <Tooltip title="Modity item">
        <EditOutlined onClick={openModal}>Modify</EditOutlined>
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
      </Tooltip>
    </>
  );
};

export default ModifyButton;
