package net.veda.kundentagchatbot.chat;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Tim Augustin
 */
@Service
@RequiredArgsConstructor
public class ChatService {
	private final ChatRepository chatRepository;

	public List<Chat> getAllChats() {
		return chatRepository.findAll();
	}

	public void saveChat(@NonNull ChatRecord chat) {
		chatRepository.save(Chat.builder().question(chat.question()).answer(chat.answer()).build());
	}
}
