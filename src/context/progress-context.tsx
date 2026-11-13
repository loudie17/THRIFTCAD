
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ProgressContextType = {
  completedLessons: string[];
  completedCount: number;
  isLoading: boolean;
  markLessonCompleted: (lessonId: string) => Promise<void>;
  unmarkLessonCompleted: (lessonId: string) => Promise<void>;
  isLessonCompleted: (lessonId: string) => boolean;
};

const STORAGE_KEY = 'thriftcad_completed_lessons';

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export function ProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved progress when the app starts
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const savedProgress = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedProgress) {
          const parsedProgress: unknown = JSON.parse(savedProgress);

          if (
            Array.isArray(parsedProgress) &&
            parsedProgress.every((id) => typeof id === 'string')
          ) {
            setCompletedLessons(parsedProgress);
          }
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, []);

  // Mark a lesson as completed
  const markLessonCompleted = useCallback(
    async (lessonId: string) => {
      if (completedLessons.includes(lessonId)) {
        return;
      }

      const updatedLessons = [...completedLessons, lessonId];

      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updatedLessons)
        );

        setCompletedLessons(updatedLessons);
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    },
    [completedLessons]
  );

  // Remove a completed lesson
  const unmarkLessonCompleted = useCallback(
    async (lessonId: string) => {
      const updatedLessons = completedLessons.filter(
        (id) => id !== lessonId
      );

      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updatedLessons)
        );

        setCompletedLessons(updatedLessons);
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    },
    [completedLessons]
  );

  // Check whether a lesson is completed
  const isLessonCompleted = useCallback(
    (lessonId: string) => completedLessons.includes(lessonId),
    [completedLessons]
  );

  const value = useMemo(
    () => ({
      completedLessons,
      completedCount: completedLessons.length,
      isLoading,
      markLessonCompleted,
      unmarkLessonCompleted,
      isLessonCompleted,
    }),
    [
      completedLessons,
      isLoading,
      markLessonCompleted,
      unmarkLessonCompleted,
      isLessonCompleted,
    ]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error(
      'useProgress must be used inside ProgressProvider'
    );
  }

  return context;
}
