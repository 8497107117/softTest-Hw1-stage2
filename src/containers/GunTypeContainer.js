import { connect } from 'react-redux';
import GunType from '../components/GunType';

const mapStateToProps = (state) => ({
  type: state.get('type')
});

const mapDispatchToProps = () => ({
});

const GunTypeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GunType);

export default GunTypeContainer;