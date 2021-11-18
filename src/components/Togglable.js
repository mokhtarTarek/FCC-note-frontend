import React, { useImperativeHandle, useState } from "react";
/*
  To recap, the useImperativeHandle function is a React hook,
  that is used for defining functions in a component which can
  be invoked from outside of the component.
  So far this is the only situation where using React hooks leads
  to code that is not cleaner than with class components.
*/

/*
  props.children :represent child compo or any others tags that this component
  can render inside it
*/

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent" >
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
