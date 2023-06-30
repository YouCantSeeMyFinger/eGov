package kr.board.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.board.entity.Board;
import kr.board.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class BoardController {

	// 생성자 DI
	private final BoardMapper boardMapper;

	@RequestMapping("/")
	public String main() {
		return "home";
	}

	@GetMapping("/boardList.do")
	@ResponseBody
	public List<Board> boardList() {
		List<Board> list = this.boardMapper.getLists();
		return list;
	}

}
