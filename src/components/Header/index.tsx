import { Button, Space } from "antd";
import React from "react";

function Header(props: {
  onShowAdd: () => void;
  onShowIntro: () => void;
  // onShowSocialMedia: () => void;
}) {
  return (
    <Space>
      <Button onClick={props.onShowIntro}>介绍自己</Button>
      <Button onClick={props.onShowAdd}>写广告</Button>
      {/* <Button>
        创作视频
      </Button> */}
    </Space>
  );
}

export default Header;
