
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { useProgress } from '@/context/progress-context';

export default function HomeScreen() {
  const { completedCount, isLoading } = useProgress();

  const lessons = [
    { title: 'Understanding Ukay-Ukay', category: 'THRIFT CULTURE', time: '5 min' },
    { title: 'Identifying Clothing Brands', category: 'BRAND KNOWLEDGE', time: '8 min' },
    { title: 'Spotting Vintage Pieces', category: 'VINTAGE GUIDE', time: '6 min' },
    { title: 'Inspecting Garments', category: 'GARMENT INSPECTION', time: '7 min' },
  ];

  const totalLessons = lessons.length;
  const progressPercentage = (completedCount / totalLessons) * 100;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>THRIFTCAD.</Text>
            <Text style={styles.subtitle}>THE ART OF THRIFTING</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>T</Text>
          </View>
        </View>

        <View style={styles.welcome}>
          <Text style={styles.eyebrow}>YOUR THRIFTING JOURNEY</Text>
          <Text style={styles.heading}>
            Discover the value{'\n'}behind every thread.
          </Text>
          <Text style={styles.description}>
            Learn to identify, understand, and appreciate clothing.
          </Text>

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>START LEARNING  →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.cardLabel}>YOUR PROGRESS</Text>
            <Text style={styles.progressNumber}>LEVEL 01</Text>
          </View>

          <Text style={styles.progressTitle}>Beginner Thrifter</Text>

          <Text style={styles.progressDescription}>
            {isLoading
              ? 'Loading progress...'
              : `${completedCount} of ${totalLessons} lessons completed`}
          </Text>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${isLoading ? 0 : progressPercentage}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Learning Modules</Text>
          <Text style={styles.sectionLink}>VIEW ALL</Text>
        </View>

        {lessons.map((lesson, index) => (
          <TouchableOpacity key={index} style={styles.lessonCard}>
            <View style={styles.lessonNumber}>
              <Text style={styles.lessonNumberText}>0{index + 1}</Text>
            </View>

            <View style={styles.lessonInfo}>
              <Text style={styles.lessonCategory}>{lesson.category}</Text>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonTime}>{lesson.time} read</Text>
            </View>

            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            THRIFTCAD · LEARN BEYOND THE RACK.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E8',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#292820',
  },
  subtitle: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#887E6C',
    marginTop: 4,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#292820',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#F5F1E8',
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcome: {
    marginHorizontal: 20,
    padding: 25,
    backgroundColor: '#292820',
    borderRadius: 8,
  },
  eyebrow: {
    color: '#C8B99D',
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 18,
  },
  heading: {
    color: '#F5F1E8',
    fontSize: 31,
    fontWeight: 'bold',
    lineHeight: 39,
  },
  description: {
    color: '#C8C2B5',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 13,
  },
  primaryButton: {
    backgroundColor: '#D7C4A2',
    padding: 15,
    marginTop: 23,
    alignItems: 'center',
    borderRadius: 4,
  },
  primaryButtonText: {
    color: '#292820',
    fontWeight: 'bold',
    fontSize: 11,
    letterSpacing: 1,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontSize: 10,
    color: '#887E6C',
    letterSpacing: 1.5,
  },
  progressNumber: {
    fontSize: 10,
    color: '#887E6C',
    fontWeight: 'bold',
  },
  progressTitle: {
    fontSize: 19,
    color: '#292820',
    fontWeight: 'bold',
    marginTop: 14,
  },
  progressDescription: {
    fontSize: 12,
    color: '#887E6C',
    marginTop: 5,
  },
  progressBackground: {
    height: 7,
    backgroundColor: '#EAE5DB',
    borderRadius: 5,
    marginTop: 17,
  },
  progressFill: {
    height: 7,
    backgroundColor: '#85714F',
    borderRadius: 5,
  },
  sectionHeader: {
    marginHorizontal: 22,
    marginTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#292820',
  },
  sectionLink: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#85714F',
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonNumber: {
    width: 42,
    height: 48,
    backgroundColor: '#EEE9DF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  lessonNumberText: {
    color: '#85714F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonInfo: {
    flex: 1,
    marginLeft: 13,
  },
  lessonCategory: {
    color: '#99876A',
    fontSize: 9,
    letterSpacing: 1,
  },
  lessonTitle: {
    color: '#292820',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  lessonTime: {
    color: '#998F80',
    fontSize: 11,
    marginTop: 4,
  },
  arrow: {
    fontSize: 20,
    color: '#85714F',
  },
  footer: {
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#998F80',
    fontSize: 9,
    letterSpacing: 1.5,
  },
});
