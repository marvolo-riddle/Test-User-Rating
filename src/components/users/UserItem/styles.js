import 'typeface-jura';


export const styles = {

  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
    border: '0.1px solid #A7A6A699',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },

  userBox: {
    display: 'flex',
    flexDirection: 'column',
  },

  username: {
    color: 'black',
    textDecoration: 'none',
    fontFamily: 'Jura, sans-serif',
    fontSize: '1.6rem',
  },

  link: {
    padding: '1rem 0',
    '&:hover': {
      fontSize: '1.7rem',
    }
  },

  rating: {
    fontSize: '1.4rem',
    color: '#ff7b00',
    letterSpacing: '0.2rem',
    paddingBottom: '0.5rem',
  },

  carouselBox: {
    width: '50%',
    alignContent: 'center',
    paddingRight: '1rem',
  }
}