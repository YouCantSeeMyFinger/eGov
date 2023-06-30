package kr.board.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.board.entity.Board;
import kr.board.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class BoardController {

	// 생성자 DI
	private final BoardMapper boardMapper;

	@RequestMapping("/boardList.do")
	public String boardList(Model model) {
		List<Board> list = boardMapper.getLists();
		model.addAttribute("list", list);
		return "boardList";
	}

	// TODO
	// 제목 , 작성자가 없을 경우는 게시글을 작성 할 수 없도록 한다.
	@GetMapping("/boardForm.do")
	public String boardForm() {
		return "boardForm";
	}

	@PostMapping("/boardInsert.do")
	public String boardInsert(Board vo) {
		log.info("Object : {}", vo);
		this.boardMapper.boardInsert(vo);
		return "redirect:/boardList.do";
	}

	@GetMapping("/boardContents.do/{idx}")
	public String boardContents(@PathVariable(value = "idx") int idx, Model model) {
		Board vo = this.boardMapper.boardContents(idx);
		this.boardMapper.boardCount(idx);
		model.addAttribute("vo", vo);
		return "boardContents";
	}

	@GetMapping("/boardDelete.do/{idx}")
	public String boardDelete(@PathVariable("idx") int idx) {
		this.boardMapper.boardDelete(idx);
		return "redirect:/boardList.do";
	}

	@GetMapping("/boardUpdateForm.do/{idx}")
	public String boardUpdateForm(@PathVariable("idx") int idx, Model model) {
		Board vo = this.boardMapper.boardContents(idx);
		model.addAttribute("vo", vo);
		return "boardUpdate";
	}

	@PostMapping("/boardUpdate.do")
	public String boardUpdate(Board vo) {
		this.boardMapper.boardUpdate(vo);
		return "redirect:/boardList.do";
	}
}
