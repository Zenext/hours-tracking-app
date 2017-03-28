import React from 'react';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import AddIcon from 'grommet/components/icons/base/Add';

const renderMenu = () => {
  return (
    <Box flex='grow'
      justify='start'>
      <Menu primary={true}>
        <Anchor path="/games">
          Games
        </Anchor>
        <Anchor path="/people">
          People
        </Anchor>
        <Anchor path="/records">
          Records
        </Anchor>
        <Anchor path="/records/new">
          New Record 
        </Anchor>
      </Menu>
    </Box>
  );
}

const renderSidebar = () => {
  return (
    <Sidebar colorIndex='neutral-1'
      size='small'>
      
      <Header pad='medium'
        justify='between'>
        <Title>Menu</Title>
      </Header>

      {renderMenu()} 
    </Sidebar>
  );
}

export default renderSidebar;