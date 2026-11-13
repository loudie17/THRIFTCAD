
import { useLocalSearchParams, router } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useProgress } from '@/context/progress-context';

const lessons = [
  {
    number: '01',
    title: 'Understanding Ukay-Ukay',
    description: 'Learn about Philippine thrift culture and secondhand clothing.',
    content:
      'Ukay-ukay refers to secondhand clothing sold in the Philippines. These items are often imported and sold at affordable prices. Thrifting allows people to find unique clothing while promoting reuse and reducing textile waste.',
  },
  {
    number: '02',
    title: 'Identifying Clothing Brands',
    description: 'Recognize popular, premium, and vintage clothing brands.',
    content:
      'Learning to identify clothing brands helps you understand the quality, style, and potential value of garments. Examine the brand logo, neck label, care tag, stitching, and overall construction.',
  },
  {
    number: '03',
    title: 'Spotting Vintage Pieces',
    description: 'Understand vintage clothing and what makes a piece valuable.',
    content:
      'Vintage clothing generally refers to garments that are at least 20 years old. Look at the design, fabric, labels, construction, and historical details when evaluating a possible vintage piece.',
  },
  {
    number: '04',
    title: 'Inspecting Garments',
    description: 'Check fabric, stitching, tags, condition, and quality.',
    content:
      'Before buying a secondhand garment, inspect its fabric, seams, buttons, zippers, labels, and overall condition. Check for stains, holes, fading, and other signs of damage.',
  },
];

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    isLessonCompleted,
    markLessonCompleted,
    unmarkLessonCompleted,
    isLoading,
  } = useProgress();

  const lesson = lessons.find((item) => item.number === id);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lesson not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isCompleted = isLessonCompleted(lesson.number);

  const toggleCompletion = async () => {
    if (isCompleted) {
      await unmarkLessonCompleted(lesson.number);
    } else {
      await markLessonCompleted(lesson.number);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.lessonNumber}>
          LESSON {lesson.number}
        </Text>

        <Text style={styles.title}>{lesson.title}</Text>

        <Text style={styles.description}>
          {lesson.description}
        </Text>
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.sectionTitle}>LESSON OVERVIEW</Text>
        <Text style={styles.content}>{lesson.content}</Text>
      </View>

      <View style={styles.completionSection}>
        <TouchableOpacity
          style={[
            styles.completeButton,
            isCompleted && styles.completedButton,
          ]}
          onPress={toggleCompletion}
          disabled={isLoading}
        >
          <Text style={styles.completeButtonText}>
            {isLoading
              ? 'Loading progress...'
              : isCompleted
                ? '✓ Completed (Tap to Undo)'
                : 'Mark as Completed'}
          </Text>
        </TouchableOpacity>

        {isCompleted && (
          <Text style={styles.completedMessage}>
            Great job! You have completed this lesson.
          </Text>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          THRIFTCAD. | LEARN AND DISCOVER
        </Text>
      </View>
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
    paddingBottom: 25,
  },
  backText: {
    color: '#8A806F',
    fontSize: 16,
    marginBottom: 25,
  },
  lessonNumber: {
    fontSize: 11,
    color: '#A18A65',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#292820',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#777064',
    marginTop: 10,
    lineHeight: 22,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 22,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#A18A65',
    letterSpacing: 2,
    marginBottom: 15,
  },
  content: {
    fontSize: 15,
    color: '#514D43',
    lineHeight: 26,
  },
  completionSection: {
    marginHorizontal: 20,
    marginTop: 25,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#A18A65',
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: '#6F8065',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  completedMessage: {
    color: '#6F8065',
    fontSize: 13,
    marginTop: 12,
  },
  footer: {
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#8A806F',
    letterSpacing: 1,
  },
});
