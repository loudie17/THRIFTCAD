
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

const lessons = [
  {
    number: '01',
    title: 'Understanding Ukay-Ukay',
    description:
      'Learn about Philippine thrift culture and secondhand clothing.',
    duration: '5 min',
  },
  {
    number: '02',
    title: 'Identifying Clothing Brands',
    description:
      'Recognize popular, premium, and vintage clothing brands.',
    duration: '8 min',
  },
  {
    number: '03',
    title: 'Spotting Vintage Pieces',
    description:
      'Understand vintage clothing and what makes a piece valuable.',
    duration: '6 min',
  },
  {
    number: '04',
    title: 'Inspecting Garments',
    description:
      'Check fabric, stitching, tags, condition, and quality.',
    duration: '7 min',
  },
];

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>THRIFTCAD.</Text>
        <Text style={styles.subtitle}>
          YOUR THRIFTING LEARNING SPACE
        </Text>
      </View>

      <View style={styles.intro}>
        <Text style={styles.introTitle}>
          Learn the art of thrifting.
        </Text>
        <Text style={styles.introText}>
          Build your knowledge, recognize quality, and discover the stories
          behind secondhand clothing.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>YOUR LESSONS</Text>

      {lessons.map((lesson) => (
        <TouchableOpacity
          key={lesson.number}
          style={styles.lessonCard}
          activeOpacity={0.8}
          onPress={() =>
            router.push(`/lesson/${lesson.number}` as any)
          }
        >
          <View style={styles.lessonNumber}>
            <Text style={styles.numberText}>
              {lesson.number}
            </Text>
          </View>

          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>
              {lesson.title}
            </Text>

            <Text style={styles.lessonDescription}>
              {lesson.description}
            </Text>

            <Text style={styles.duration}>
              {lesson.duration} read
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.footer}>
        KNOW MORE. THRIFT BETTER.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E8',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  brand: {
    fontSize: 27,
    fontWeight: '900',
    color: '#292820',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 10,
    color: '#8A806F',
    letterSpacing: 2,
    marginTop: 5,
  },
  intro: {
    backgroundColor: '#292820',
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 18,
    marginBottom: 30,
  },
  introTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#F5F1E8',
    marginBottom: 10,
  },
  introText: {
    fontSize: 14,
    color: '#D8D0C1',
    lineHeight: 22,
  },
  sectionTitle: {
    marginHorizontal: 24,
    marginBottom: 15,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8A806F',
    letterSpacing: 2,
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonNumber: {
    width: 42,
    height: 42,
    backgroundColor: '#E9E1D2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontWeight: 'bold',
    color: '#665A46',
  },
  lessonInfo: {
    flex: 1,
    marginLeft: 14,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#292820',
  },
  lessonDescription: {
    fontSize: 12,
    color: '#777064',
    marginTop: 5,
    lineHeight: 18,
  },
  duration: {
    fontSize: 11,
    color: '#A18A65',
    marginTop: 8,
  },
  arrow: {
    fontSize: 25,
    color: '#8A806F',
    marginLeft: 8,
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 35,
    fontSize: 10,
    letterSpacing: 2,
    color: '#8A806F',
    fontWeight: 'bold',
  },
});
