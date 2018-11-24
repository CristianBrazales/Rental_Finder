import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import {Button, Card, CardSection,  Input} from './common';

const PostDetail = ({ info }) => {
    const { _id,username, address, roomNumber } = info;
    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      imageStyle
    } = styles;
  
    return (
      <Card>
        <CardSection>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{"ID:"}{_id}</Text>
            <Text>{"Username:"}{username}</Text>
            <Text>{"Address:"}{address}</Text>
          </View>
        </CardSection>

  
        <CardSection>
          <Button onPress={() =>alert("Pressed")}>
            Send Email
          </Button>
        </CardSection>
      </Card>
    );
  };
  
  const styles = {
    headerContentStyle: {
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    headerTextStyle: {
      fontSize: 18
    },
    thumbnailStyle: {
      height: 50,
      width: 50
    },
    thumbnailContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10
    },
    imageStyle: {
      height: 300,
      flex: 1,
      width: null
    }
  };
  
  export default PostDetail;