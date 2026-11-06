import { onMounted } from 'vue'
import { SCENE_FLUSH_LIMIT } from '@/constants/run'
import { DEFAULT_TASK } from '@/data/run-script'
import type { AgentRun } from '@/types/agent'
import type { Scene } from '@/types/app'

/** Lets queued microtasks run until the condition holds, with a hard limit */
const settle = async (until: () => boolean): Promise<void> => {
  for (let i = 0; i < SCENE_FLUSH_LIMIT && !until(); i++) {
    await Promise.resolve()
  }
}

/**
 * Jumps the run straight to a state for screenshots and reviewers:
 * "approval" stops at the proposed changes, "done" decides them and rates the result.
 */
export const useScenePlayback = (run: AgentRun, scene: Scene | null): void => {
  onMounted(async () => {
    if (!scene) {
      return
    }

    void run.start(DEFAULT_TASK)
    await settle(() => run.state.status === 'awaiting-approval')

    if (scene !== 'done') {
      return
    }

    run.decide('w1', 'approved')
    run.decide('w2', 'approved')
    run.decide('w3', 'rejected')
    run.confirmDecisions()
    await settle(() => run.state.status === 'completed')
    run.rate('useful')
  })
}
