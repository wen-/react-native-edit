import Cssload from "components/css";

export default Cssload({
  itemBox: {
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 49,
  },
  item: {
    height: 49,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  delBtn: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  delTxt: {
    color: "#fff",
  },
});
