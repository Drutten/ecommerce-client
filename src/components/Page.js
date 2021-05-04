import { useEffect } from 'react';

const Page = (props) => {
  useEffect(() => {
    document.title = props.title || ''; // set documents title text
  }, [props.title]);
  return props.children;
};

export default Page;