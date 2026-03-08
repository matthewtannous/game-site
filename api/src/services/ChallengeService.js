import { ChallengeDTO } from "../domain/dto/ChallengeDTO.js";

export class ChallengeService {

    constructor(challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    async listChallenges() {
        try {
            const challenges = await this.challengeRepository.findAll();
            return challenges.map(challenge => ChallengeDTO.fromEntity(challenge));
        } catch (error) {
            throw new Error(`Failed to list challenges: ${error.message}`);
        }
    }

    async getChallengeById(id) {
        try {
            if (!id || isNaN(id)) {
                throw new Error('Invalid Challenge id');
            }
            const challenge = await this.challengeRepository.findById(id);
            return challenge ? ChallengeDTO.fromEntity(challenge) : null;
        } catch (error) {
            throw new Error(`Failed to get challenge: ${error.message}`);
        }
    }

    async createChallenge(data) {
        try {
            if (!data || !data.senderId || !data.receiverId || !data.gameType) {
                throw new Error('Missing required fields: Sender ID, Receiver ID, Game Type');
            }
            const challenge = await this.challengeRepository.create(data);
            return ChallengeDTO.fromEntity(challenge);
        } catch (error) {
            throw new Error(`Failed to create challenge: ${error.message}`);
        }
    }

    async updateChallenge(id, data) {
        try {
            if (!id || isNaN(id)) {
                throw new Error('Invalid Challenge id');
            }
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No data provided for update');
            }
            const challenge = await this.challengeRepository.update(id, data);
            return challenge ? ChallengeDTO.fromEntity(challenge) : null;
        } catch (error) {
            throw new Error(`Failed to update challenge: ${error.message}`);
        }
    }

    async deleteChallenge(id) {
        try {
            if (!id || isNaN(id)) {
                throw new Error('Invalid Challenge id');
            }
            return await this.challengeRepository.delete(id);
        } catch (error) {
            throw new Error(`Failed to delete challenge: ${error.message}`);
        }
    }

    // TODO
    async listChallengesDetailed() {

    }

    async getChallengeByIdDetailed() {
        
    }
}