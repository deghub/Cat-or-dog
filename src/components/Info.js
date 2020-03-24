import * as React from "react";
import {
	ScrollView,
	Linking,
	TouchableOpacity,
	View,
	Text,
	Image
} from "react-native";

import {photoSources} from "../data/index";
import Heart from "./Heart";
import RightAnswerCount from "./RightAnswerCount";

const Info = ({scrollViewRef}) => {
	return (
		<ScrollView
			ref={scrollViewRef}
			style={{
				flex: 1
			}}
		>
			<View
				style={{
					width: "100%",
					padding: 16
				}}
			>
				<Text
					style={{
						fontSize: 25
					}}
				>
          Tap Cat or Dog
				</Text>

				<Text
					style={{
						fontSize: 12
					}}
				>
					version: 1.0.0
				</Text>

				<View style={{}}>
					<Text
						style={{
							marginTop: 16,
							fontSize: 20,
              marginBottom: 6
						}}
					>
						How To play
					</Text>
					<Text>1) Select photo categories</Text>
					<Text>2) Tap and swipe photos according to the categories</Text>
					<Text>3) If the image goes to wrong category, you will lose your life</Text>
					<Text>4) If you tap the red circled black dog image, you will lose your life</Text>
					<Text>5) Game ends after 5th mistake</Text>

					<Text
						style={{
							marginTop: 16,
							fontSize: 20
						}}
					>
					</Text>

					<View
						style={{
							alignItems: "center",
							flexDirection: "row"
						}}
					>
						<Heart color={"red"} cornerColor={"#faff00"} />
						<Text
							style={{
								marginStart: 5
							}}
						>
							- life count
						</Text>
					</View>

					<View
						style={{
							marginTop: 8,
							alignItems: "center",
							flexDirection: "row"
						}}
					>
						<RightAnswerCount count={10} />
						<Text
							style={{
								marginStart: 10
							}}
						>
							- game score
						</Text>
					</View>
				</View>

				<Text
					style={{
						marginTop: 16,
						marginBottom: 8
					}}
				>
					You can check your game history and your best core ever
				</Text>
				{/* {photoSources.map(image => {
					return (
						<View key={image.resource}>
							<Image
								style={{
									height: 150,
									aspectRatio: 1
								}}
								source={image.resource}
							/>

							<TouchableOpacity onPress={() => Linking.openURL(image.source)}>
								<Text
									style={{
										marginBottom: 15,
										color: "blue",
										fontSize: 14
									}}
									key={image.source}
								>
									{image.source}
								</Text>
							</TouchableOpacity>
						</View>
					);
				})}
				<Text
					style={{
						fontSize: 20,
						marginTop: 16,
						marginBottom: 8
					}}
				>
					audio sources
				</Text>
				<Text
					style={{
						marginTop: 16,
						marginBottom: 8
					}}
				>
					"Cat, Screaming, A.wav" by InspectorJ (www.jshaw.co.uk) of
					Freesound.org
				</Text> */}
			</View>
		</ScrollView>
	);
};

export default Info;
