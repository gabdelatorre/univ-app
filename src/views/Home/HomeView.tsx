import logo from '../../assets/logo.svg';
import { useTypedSelector } from '../../utils/useTypedSelector';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUniversities } from '../../redux/modules/universities/actions';
import { useFirebase } from 'react-redux-firebase';
import { Typography } from 'antd';
import { useAuthContext } from '../../providers/AuthProvider';

const { Link, Text } = Typography;

export const HomeView = () => {
  const firebase = useFirebase();
  const { auth } = useAuthContext();
  const universityList = useTypedSelector((state) => state.universities.universities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUniversities({ name: 'Middle', country: 'United States' }));
  }, [dispatch]);

  const handleLogout = () => {
    firebase.logout();
  };

  return (
    <div>
      <div>
        <Text> {auth.email} </Text>
        <Link onClick={handleLogout}> Logout </Link>
      </div>
      <img src={logo} className='App-logo' alt='logo' />
      {universityList.map((university) => (
        <div key={university.name}> {university.name} </div>
      ))}
    </div>
  );
};
