import React, { FC, useEffect } from "react"
import { View, ViewStyle, TextStyle, SafeAreaView, Button, FlatList, ActivityIndicator, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Screen,
  Text,
} from "../../components"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"
import { toJS } from "mobx"


const TXT: TextStyle = {
  color: 'black'
}
const LOAD: ViewStyle = {
  flex: 1,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center'
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {

    const { hitsStore } = useStores();
    const { hits, isLoading, currentPage } = hitsStore

    function renderItems({ item, index }) {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('demo', { item: item })}>
          <View style={{ borderWidth: 1, margin: 10, padding: 10 }}>
            <Text style={[TXT, { fontWeight: 'bold' }]}>{index}</Text>
            <Text style={TXT}>{item.created_at}</Text>
            <Text style={TXT}>{item.title}</Text>
            <Text style={TXT}>{item.author}</Text>
          </View>
        </TouchableOpacity>
      )
    }

    useEffect(() => {
      if (currentPage == 0) {
        callExtra()
        console.log('calling')
      }
    }, [])
    // console.log('page: ', currentPage)
    useEffect(() => {
      const interval = setInterval(() => {
        callExtra()
      }, 20000);
      return () => {
        clearInterval(interval);
      }
    }, [])

    function callExtra() {
      hitsStore.getPosts()
    }
    function onEnd() {
      if (!isLoading) {
        hitsStore.getPosts()
      }
    }
    console.log('*****')
    hits.forEach(element => {
      console.log(element.title)
    });
    return (
      <Screen style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Text style={{ color: 'black' }}>{currentPage}</Text>
          {/* <Button
            title='call'
            testID="btn"
            onPress={() => {
            }}
          /> */}
          <Text style={TXT}>{hits.length}</Text>
          {isLoading ?
            <View style={LOAD}>
              <ActivityIndicator
                color={'navy'}
                size='large'
              />
            </View>
            : <FlatList
              data={toJS(hits)}
              testID='list'
              renderItem={renderItems}
              keyExtractor={index => index + Math.random()}
              contentContainerStyle={{}}
              onEndReached={onEnd}
              onEndReachedThreshold={0.1}
              ListFooterComponent={<View style={{ height: 20 }} />}
            />}
        </SafeAreaView>
      </Screen>
    )
  },
)
