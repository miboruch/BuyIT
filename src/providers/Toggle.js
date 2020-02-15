import React, { useState } from 'react';

const Toggle = ({ render }) => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  return render(isOpen, toggle);
};

export default Toggle;
