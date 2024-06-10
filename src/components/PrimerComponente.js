import React from 'react';
import { Button, Flex} from 'antd';
const boxStyle = {
  width: '100%',
  height: 90,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};
export const Header = () => {
  return (
    <Flex gap="middle" align="start" vertical>
      <Flex style={boxStyle} justify={'space-around'} align={'center'}>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
      </Flex>
    </Flex>
  );
};
export default Header;