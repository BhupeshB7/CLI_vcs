// constants/constants.js
import path from 'path';

export const vcsDir = path.join(process.cwd(), '.vcs');
export const commitsDir = path.join(vcsDir, 'commits');
export const stagingDir = path.join(vcsDir, 'staging');
export const historyFile = path.join(vcsDir, 'history.json');
