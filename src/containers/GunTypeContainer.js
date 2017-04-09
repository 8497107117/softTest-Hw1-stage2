import { connect } from 'react-redux';
import GunType from '../components/GunType';

const mapStateToProps = (state) => ({
  types: state.get('gunType').get('types')
});

const mapDispatchToProps = () => ({
});

const GunTypeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GunType);

export default GunTypeContainer;