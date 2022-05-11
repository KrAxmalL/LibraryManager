
export const getHomePageForUser = (roles) => {
    if(!roles) {
      return '/login';
    }
    else if(roles.includes('READER')) {
      return '/reader/books';
    }
    else if(roles.includes('LIBRARIAN')) {
      return '/librarian/books';
    }
    else if(roles.includes('ADMINISTRATOR')) {
      return '/administrator/readers';
    }
    else {
      return '/unauthorized';
    }
  }