import useScrollPosition from '@react-hook/window-scroll';

export const BackTop = ({}) => {
  const cookies = document.getElementById('set-cookie');

  const cookiesVisible = cookies && cookies.style.display !== 'none';

  const scrollPosition = useScrollPosition(60);

  return scrollPosition < 400 ? '' : <a
    className={ 'back-top' }
    style={ {
      display: 'block',
      bottom: cookiesVisible ? '120px' : '50px',
    } }
    onClick={ () => window.scrollTo(0, 0) }
  />;
};
