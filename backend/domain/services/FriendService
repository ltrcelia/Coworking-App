import { Member } from "../entities/Member";

export class FriendService {
    private member: Member;
    private friends: Member[] = [];

    constructor(member: Member) {
        this.member = member;
    }

    /**
     * Ajoute un ami au membre
     */
    addFriend(friend: Member): Member {
        const exists = this.friends.some(f => f.id === friend.id);
        if (!exists) {
            this.friends.push(friend);
        }
        return friend;
    }

    /**
     * Met à jour la liste des amis
     */
    updateFriendsList(): void {
        const uniqueFriends = Array.from(new Map(this.friends.map(f => [f.id, f])).values());
        this.friends = uniqueFriends;
    }

    /**
     * Supprime tous les amis du membre
      * @param friendId - l'ID du membre à supprimer
      */
    removeFriend(friendId: string): void {
        this.friends = this.friends.filter(f => f.id !== friendId);
    }

    /**
     * Retourne la liste des amis
     */
    displayFriends(): Member[] {
        return [...this.friends];
    }
}
