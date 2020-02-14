import React, { useState } from 'react';

const withEditToggle = WrappedComponent => () => {
  const [isEditOpen, setEditOpen] = useState(false);

  const toggleEdit = () => {
    setEditOpen(!isEditOpen);
  };

  return <WrappedComponent isOpen={isEditOpen} toggleEdit={toggleEdit} />;
};

export default withEditToggle;
