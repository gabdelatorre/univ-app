import logo from '../../assets/logo.svg';
import { useTypedSelector } from '../../utils/useTypedSelector';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUniversities } from '../../redux/modules/universities/actions';

export const HomeView = () => {
  const universityList = useTypedSelector((state) => state.universities.universities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUniversities({ name: 'Middle', country: 'United States' }));
  }, [dispatch]);

  return (
    <div>
      <img src={logo} className='App-logo' alt='logo' />
      {universityList.map((university) => (
        <div key={university.name}> {university.name} </div>
      ))}
    </div>
  );
};
