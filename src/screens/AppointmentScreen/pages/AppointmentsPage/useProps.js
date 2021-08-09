export const useProps = ({ navigation }) => {
  return {
    onChangeWeekText: (text) => {
      navigation.setOptions({
        tabBarLabel: text,
      });
    },
  };
};
