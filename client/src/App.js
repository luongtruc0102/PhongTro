import { Routes, Route } from 'react-router-dom';
import { Home, Login, Rental, News, ServicePrice, HomePage, DetailPost, SearchDetail } from './containers/Public/Index';
import { path } from './ultils/constant'
import { System, CreatePost, ManagePost, EditAccount, Contact, HistoryBanking, HistoryPayment } from './containers/System/Index'
import * as actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 100)
  }, [isLoggedIn, dispatch])

  useEffect(() => {
    dispatch(actions.getPrices())
    dispatch(actions.getAreas())
    dispatch(actions.getProvinces())
  }, [dispatch])

  return (
    <div className="bg-primary overflow-hidden">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path='*' element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.TIM_NGUOI_O_GHEP} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.TIN_TUC} element={<News />} />
          <Route path={path.BANG_GIA_DICH_VU} element={<ServicePrice />} />
          <Route path={path.DETAIL_POST__TITLE_POSTID} element={<DetailPost />} />
          {/* <Route path={path.DETAIL_ALL} element={<DetailPost />} /> */}
        </Route>

        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} /> 
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} /> 
          <Route path={path.CONTACT} element={<Contact />} /> 
          <Route path={path.HISTORY_BANKING} element={<HistoryBanking />} /> 
          <Route path={path.HISTORY_PAYMENT} element={<HistoryPayment />} /> 
        </Route>

      </Routes>
    </div>
  );
}

export default App;
