package kr.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import kr.board.entity.Board;

@Mapper
public interface BoarderMapper {
	List<Board> getLists();
}
