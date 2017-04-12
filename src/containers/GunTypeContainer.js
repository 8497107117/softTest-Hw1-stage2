import { connect } from 'react-redux';
import GunType from '../components/GunType';

const mapStateToProps = (state) => ({
  names: state.get('gunType').get('names'),
  types: state.get('gunType').get('types')
});

const mapDispatchToProps = () => ({
});

const GunTypeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GunType);

export default GunTypeContainer;