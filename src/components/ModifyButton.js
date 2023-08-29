import { Button, Modal, Tooltip } from "antd";
import { useState } from "react";
import ModificationForm from "./ModificationForm";
import { EditOutlined } from "@ant-design/icons";

const ModifyButton = ({ item, handleModifySuccess }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const handleModify = () => {
    handleModifySuccess();
    setModalVisible(false);
  };

  return (
    <>
      <Tooltip title="Modity item">
        <EditOutlined onClick={openModal}>Modify</EditOutlined>
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
            <ModificationForm item={item} handleModifySuccess={handleModify} />
          </Modal>
        )}
      </Tooltip>
    </>
  );
};

export default ModifyButton;
