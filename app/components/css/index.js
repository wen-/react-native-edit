import { StyleSheet } from 'react-native';

export default style => StyleSheet.create({
  f1: { flex: 1 },
  fs12: { fontSize: 12 },
  fs14: { fontSize: 14 },
  fs13: { fontSize: 13 },
  fs15: { fontSize: 15 },
  fs16: { fontSize: 16 },
  fs17: { fontSize: 17 },
  fs18: { fontSize: 18 },
  bgColor: {
    backgroundColor: '#F2F4F7'
  },
  mainColor: {
    color: '#5B616C'
  },
  assistColor: {
    color: '#989CA3'
  },
  assistColor1: {
    color: '#d4d8df'
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    backgroundColor: '#ccc',
    height: StyleSheet.hairlineWidth,
  },

  ...style
});
