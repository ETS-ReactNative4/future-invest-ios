import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #ffffff;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #f6f6f6;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserImgWrapper = styled.View`
  padding-top: 15px;
  padding-bottom: 15px;
  margin-right: 20px;
  background-color: #aeaeae;

  max-width: 50px;
  max-height: 50px;
  min-width: 50px;
  min-height: 50px;
  border-radius: 25px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  font-family: 'Lato-Regular';
`;

export const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
  font-family: 'Lato-Regular';
`;

export const MessageText = styled.Text`
  font-size: 14px;
  color: #333333;
`;

export const TextNumber = styled.Text`
background-color : #fb5135;
min-width: 20px;
min-height: 20px;
max-height: 20px;
color: #fff;
border-radius: 10px;
overflow: hidden;
padding-left: 8px;
padding-right: 8px;
padding-top: 2px;
padding-bottom: 2px;

display: flex;
align-items: center;
justify-content: center;
text-align : center;

position : absolute;
right: 0;
top: 42px;
`;