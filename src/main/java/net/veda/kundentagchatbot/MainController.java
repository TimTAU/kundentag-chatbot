package net.veda.kundentagchatbot;

import lombok.RequiredArgsConstructor;
import net.veda.kundentagchatbot.chat.ChatRecord;
import net.veda.kundentagchatbot.chat.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author Tim Augustin
 */
@Controller
@RequestMapping("/")
@RequiredArgsConstructor
public class MainController {
	private final ChatService chatService;

	@GetMapping
	public ModelAndView getMainHtml() {
		final ModelAndView mav = new ModelAndView("index");

		mav.addObject("chats", chatService.getAllChats());

		return mav;
	}

	@PostMapping("/save")
	public ResponseEntity<Void> savePair(@RequestBody ChatRecord chat) {
		chatService.saveChat(chat);
		return ResponseEntity.ok().build();
	}
}
