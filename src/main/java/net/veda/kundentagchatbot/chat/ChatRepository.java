package net.veda.kundentagchatbot.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Tim Augustin
 */
@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
}
